<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false]);
    exit;
}

// ── Dados do formulário ────────────────────────────────────────────────────
$name     = htmlspecialchars(strip_tags(trim($_POST['booking_name']     ?? '')));
$phone    = htmlspecialchars(strip_tags(trim($_POST['booking_phone']    ?? '')));
$email    = htmlspecialchars(strip_tags(trim($_POST['booking_email']    ?? '')));
$city     = htmlspecialchars(strip_tags(trim($_POST['booking_city']     ?? '')));
$presence = htmlspecialchars(strip_tags(trim($_POST['booking_presence'] ?? '')));
$audiology= htmlspecialchars(strip_tags(trim($_POST['booking_audiometry']?? '')));
$devices  = htmlspecialchars(strip_tags(trim($_POST['booking_devices']  ?? '')));
$symptom  = htmlspecialchars(strip_tags(trim($_POST['booking_symptom']  ?? '')));
$origin   = htmlspecialchars(strip_tags(trim($_POST['origin']           ?? 'site')));

// ── Configuração SMTP ──────────────────────────────────────────────────────
$smtp_host = 'smtp.hostinger.com';
$smtp_port = 465;
$smtp_user = 'envio@centroauditivomacae.com.br';
$smtp_pass = '|v05HLDr!>Q';
$from_name = 'Centro Auditivo Macaé';
$from_addr = 'envio@centroauditivomacae.com.br';
$to_addr   = 'leonardo@centroauditivomacae.com.br';

// ── Mensagem ───────────────────────────────────────────────────────────────
$subject_raw = 'Novo lead - Centro Auditivo Macaé';
$subject     = '=?UTF-8?B?' . base64_encode($subject_raw) . '?=';

$body  = "Novo lead recebido pelo site\n";
$body .= "================================\n";
$body .= "Nome:        $name\n";
$body .= "Telefone:    $phone\n";
$body .= "E-mail:      $email\n";
$body .= "Cidade:      $city\n";
if ($presence)  $body .= "Presencial:  $presence\n";
if ($audiology) $body .= "Audiometria: $audiology\n";
if ($devices)   $body .= "Aparelhos:   $devices\n";
if ($symptom)   $body .= "Sintoma:     $symptom\n";
$body .= "Formulário:  $origin\n";
$body .= "================================\n";
$body .= "Data: " . date('d/m/Y H:i') . "\n";

// ── Envio via SMTP (SSL porta 465, sem biblioteca) ─────────────────────────
function smtp_send($host, $port, $user, $pass, $from_addr, $from_name, $to, $subject, $body) {
    $sock = @fsockopen("ssl://$host", $port, $errno, $errstr, 15);
    if (!$sock) return false;

    $r = function () use ($sock) { return fgets($sock, 512); };
    $w = function ($s) use ($sock) { fwrite($sock, $s . "\r\n"); };

    $r(); // 220 greeting
    $w("EHLO centroauditivomacae.com.br");
    while (($line = $r()) && substr($line, 3, 1) === '-'); // consume multi-line EHLO

    $w("AUTH LOGIN");
    $r(); // 334 username
    $w(base64_encode($user));
    $r(); // 334 password
    $w(base64_encode($pass));
    $auth = trim($r()); // 235 or error
    if (substr($auth, 0, 3) !== '235') { fclose($sock); return false; }

    $w("MAIL FROM:<$from_addr>");
    $r();
    $w("RCPT TO:<$to>");
    $r();
    $w("DATA");
    $r(); // 354

    $headers  = "From: =?UTF-8?B?" . base64_encode($from_name) . "?= <$from_addr>\r\n";
    $headers .= "To: $to\r\n";
    $headers .= "Subject: $subject\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";
    $w($headers . "\r\n" . $body . "\r\n.");

    $r(); // 250 OK
    $w("QUIT");
    fclose($sock);
    return true;
}

$sent = smtp_send($smtp_host, $smtp_port, $smtp_user, $smtp_pass, $from_addr, $from_name, $to_addr, $subject, $body);

// ── Webhook ────────────────────────────────────────────────────────────────
$webhook_payload = json_encode([
    'nome'        => $name,
    'telefone'    => $phone,
    'email'       => $email,
    'cidade'      => $city,
    'presencial'  => $presence,
    'audiometria' => $audiology,
    'aparelhos'   => $devices,
    'sintoma'     => $symptom,
    'formulario'  => $origin,
    'data'        => date('d/m/Y H:i'),
]);
$ctx = stream_context_create(['http' => [
    'method'        => 'POST',
    'header'        => "Content-Type: application/json\r\nContent-Length: " . strlen($webhook_payload),
    'content'       => $webhook_payload,
    'timeout'       => 5,
    'ignore_errors' => true,
]]);
@file_get_contents('https://automation.opscap.collieassociados.com/webhook/20a0f7ff-ecc3-44e4-9d4a-c8009acda968', false, $ctx);

echo json_encode(['ok' => (bool)$sent]);
