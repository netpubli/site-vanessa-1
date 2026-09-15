<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function loadEnvironment(string $path): void
{
    if (!is_file($path) || !is_readable($path)) {
        return;
    }

    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
            continue;
        }

        [$key, $value] = array_map('trim', explode('=', $line, 2));
        if ($key === '' || getenv($key) !== false) {
            continue;
        }

        if (strlen($value) >= 2) {
            $first = $value[0];
            $last = $value[strlen($value) - 1];
            if (($first === '"' && $last === '"') || ($first === "'" && $last === "'")) {
                $value = substr($value, 1, -1);
            }
        }

        putenv("{$key}={$value}");
        $_ENV[$key] = $value;
    }
}

function normalizeForMeta(string $value): string
{
    $value = trim($value);
    return function_exists('mb_strtolower') ? mb_strtolower($value, 'UTF-8') : strtolower($value);
}

function hashForMeta(string $value): string
{
    return hash('sha256', normalizeForMeta($value));
}

function sendMetaLeadEvent(
    string $pixelId,
    string $accessToken,
    string $graphApiVersion,
    string $eventId,
    string $eventSourceUrl,
    string $name,
    string $email,
    string $phone
): void {
    if ($pixelId === '' || $accessToken === '' || !function_exists('curl_init')) {
        return;
    }

    $phoneDigits = preg_replace('/\D+/', '', $phone) ?? '';
    if ((strlen($phoneDigits) === 10 || strlen($phoneDigits) === 11) && !str_starts_with($phoneDigits, '55')) {
        $phoneDigits = '55' . $phoneDigits;
    }

    $nameParts = preg_split('/\s+/u', trim($name), -1, PREG_SPLIT_NO_EMPTY) ?: [];
    $userData = [
        'em' => [hashForMeta($email)],
        'ph' => [hashForMeta($phoneDigits)],
    ];

    if ($nameParts !== []) {
        $userData['fn'] = [hashForMeta($nameParts[0])];
        if (count($nameParts) > 1) {
            $userData['ln'] = [hashForMeta($nameParts[count($nameParts) - 1])];
        }
    }

    $clientIp = (string) ($_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? '');
    if (filter_var($clientIp, FILTER_VALIDATE_IP)) {
        $userData['client_ip_address'] = $clientIp;
    }

    $userAgent = trim((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''));
    if ($userAgent !== '') {
        $userData['client_user_agent'] = substr($userAgent, 0, 512);
    }

    foreach (['_fbp' => 'fbp', '_fbc' => 'fbc'] as $cookieName => $metaField) {
        $cookieValue = trim((string) ($_COOKIE[$cookieName] ?? ''));
        if ($cookieValue !== '' && strlen($cookieValue) <= 255 && !preg_match('/[\x00-\x1F\x7F]/', $cookieValue)) {
            $userData[$metaField] = $cookieValue;
        }
    }

    $event = [
        'event_name' => 'Lead',
        'event_time' => time(),
        'event_id' => $eventId,
        'action_source' => 'website',
        'user_data' => $userData,
    ];

    if (filter_var($eventSourceUrl, FILTER_VALIDATE_URL)
        && in_array(strtolower((string) parse_url($eventSourceUrl, PHP_URL_SCHEME)), ['http', 'https'], true)) {
        $event['event_source_url'] = $eventSourceUrl;
    }

    if (!preg_match('/^v\d+\.\d+$/', $graphApiVersion)) {
        $graphApiVersion = 'v24.0';
    }

    $requestBody = json_encode(['data' => [$event]], JSON_UNESCAPED_SLASHES);
    if ($requestBody === false) {
        error_log('Turma Hecate Meta CAPI: falha ao serializar o evento.');
        return;
    }

    $url = sprintf(
        'https://graph.facebook.com/%s/%s/events?%s',
        $graphApiVersion,
        rawurlencode($pixelId),
        http_build_query(['access_token' => $accessToken])
    );
    $curl = curl_init($url);
    if ($curl === false) {
        return;
    }

    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $requestBody,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 2,
        CURLOPT_TIMEOUT => 5,
    ]);

    $result = curl_exec($curl);
    $httpStatus = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $curlError = curl_error($curl);
    curl_close($curl);

    if ($result === false || $httpStatus < 200 || $httpStatus >= 300) {
        error_log(sprintf('Turma Hecate Meta CAPI: envio falhou (HTTP %d, %s).', $httpStatus, $curlError ?: 'sem detalhe cURL'));
    }
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'message' => 'Método não permitido.']);
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 8192) {
    respond(413, ['ok' => false, 'message' => 'Conteúdo muito grande.']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$requestHost = strtolower(explode(':', $_SERVER['HTTP_HOST'] ?? '')[0]);
$originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));
if ($originHost !== '' && $requestHost !== '' && $originHost !== $requestHost) {
    respond(403, ['ok' => false, 'message' => 'Origem não permitida.']);
}

$payload = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($payload)) {
    respond(400, ['ok' => false, 'message' => 'Dados inválidos.']);
}

if (!empty($payload['empresa'])) {
    respond(200, ['ok' => true]);
}

$name = trim((string) ($payload['nome'] ?? ''));
$email = trim((string) ($payload['email'] ?? ''));
$whatsapp = trim((string) ($payload['whatsapp'] ?? ''));
$whatsappDigits = preg_replace('/\D+/', '', $whatsapp) ?? '';
$metaEventId = preg_replace('/[^A-Za-z0-9._:-]/', '', (string) ($payload['meta_event_id'] ?? '')) ?? '';
$metaEventId = substr($metaEventId, 0, 100);
if ($metaEventId === '') {
    $metaEventId = 'lead-' . bin2hex(random_bytes(16));
}
$eventSourceUrl = substr(trim((string) ($payload['event_source_url'] ?? '')), 0, 2048);

$nameLength = function_exists('mb_strlen') ? mb_strlen($name) : strlen($name);
if ($nameLength < 2 || $nameLength > 120) {
    respond(422, ['ok' => false, 'message' => 'Nome inválido.']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 190) {
    respond(422, ['ok' => false, 'message' => 'E-mail inválido.']);
}
if (strlen($whatsappDigits) < 10 || strlen($whatsappDigits) > 13) {
    respond(422, ['ok' => false, 'message' => 'WhatsApp inválido.']);
}

$siteRoot = dirname(__DIR__);
$projectRoot = dirname(__DIR__, 2);
$documentRoot = isset($_SERVER['DOCUMENT_ROOT']) ? rtrim((string) $_SERVER['DOCUMENT_ROOT'], '/\\') : '';
$documentParent = $documentRoot !== '' ? dirname($documentRoot) : '';
foreach (array_unique([
    $siteRoot . '/.env',
    $projectRoot . '/.env',
    $documentRoot !== '' ? $documentRoot . '/.env' : '',
    $documentParent !== '' ? $documentParent . '/.env' : '',
]) as $envPath) {
    if ($envPath === '') {
        continue;
    }
    loadEnvironment($envPath);
}

$smtpHost = getenv('SMTP_HOST') ?: 'smtp.hostinger.com';
$smtpPort = (int) (getenv('SMTP_PORT') ?: 465);
$smtpUsername = getenv('SMTP_USERNAME') ?: '';
$smtpPassword = getenv('SMTP_PASSWORD') ?: '';
$mailTo = getenv('MAIL_TO') ?: $smtpUsername;
$smtpSecure = strtolower(getenv('SMTP_SECURE') ?: 'smtps');
$metaPixelId = preg_replace('/\D+/', '', (string) (getenv('META_PIXEL_ID') ?: '1388634156007268')) ?? '';
$metaAccessToken = (string) (getenv('META_ACCESS_TOKEN') ?: '');
$metaGraphApiVersion = (string) (getenv('META_GRAPH_API_VERSION') ?: 'v24.0');

if ($smtpUsername === '' || $smtpPassword === '' || $mailTo === '') {
    error_log('Turma Hecate: configuração SMTP ausente.');
    respond(503, ['ok' => false, 'message' => 'Serviço de envio temporariamente indisponível.']);
}

$autoload = __DIR__ . '/vendor/autoload.php';
if (!is_file($autoload)) {
    error_log('Turma Hecate: PHPMailer não encontrado.');
    respond(503, ['ok' => false, 'message' => 'Serviço de envio temporariamente indisponível.']);
}
require $autoload;

$safeName = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeWhatsapp = htmlspecialchars($whatsapp, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$submittedAt = (new DateTimeImmutable('now', new DateTimeZone('America/Sao_Paulo')))->format('d/m/Y H:i:s');

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->Port = $smtpPort;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUsername;
    $mail->Password = $smtpPassword;
    $mail->SMTPSecure = $smtpSecure === 'starttls'
        ? PHPMailer::ENCRYPTION_STARTTLS
        : PHPMailer::ENCRYPTION_SMTPS;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->Timeout = 15;

    $mail->setFrom($smtpUsername, 'Formulário Turma Hécate');
    $mail->addAddress($mailTo);
    $mail->addReplyTo($email, $name);
    $mail->Subject = 'Nova inscrição — Turma Hécate';
    $mail->isHTML(true);
    $mail->Body = <<<HTML
        <div style="font-family:Arial,sans-serif;color:#17212b;line-height:1.6">
          <h2 style="color:#8a672c">Nova inscrição — Turma Hécate</h2>
          <p><strong>Nome:</strong> {$safeName}</p>
          <p><strong>E-mail:</strong> {$safeEmail}</p>
          <p><strong>WhatsApp:</strong> {$safeWhatsapp}</p>
          <p style="color:#65717d;font-size:12px">Recebido em {$submittedAt} (America/São_Paulo).</p>
        </div>
        HTML;
    $mail->AltBody = "Nova inscrição — Turma Hécate\n\nNome: {$name}\nE-mail: {$email}\nWhatsApp: {$whatsapp}\nRecebido em: {$submittedAt}";
    $mail->send();

    sendMetaLeadEvent(
        $metaPixelId,
        $metaAccessToken,
        $metaGraphApiVersion,
        $metaEventId,
        $eventSourceUrl,
        $name,
        $email,
        $whatsappDigits
    );

    respond(200, ['ok' => true]);
} catch (Exception $exception) {
    error_log('Turma Hecate SMTP: ' . $mail->ErrorInfo);
    respond(502, ['ok' => false, 'message' => 'Não foi possível enviar agora.']);
}
