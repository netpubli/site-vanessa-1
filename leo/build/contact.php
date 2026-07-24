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
$name   = htmlspecialchars(strip_tags(trim($_POST['nome']   ?? $_POST['booking_name']  ?? '')));
$phone  = htmlspecialchars(strip_tags(trim($_POST['fone']   ?? $_POST['booking_phone'] ?? '')));
$email  = htmlspecialchars(strip_tags(trim($_POST['email']  ?? $_POST['booking_email'] ?? '')));
$city   = htmlspecialchars(strip_tags(trim($_POST['cidade'] ?? $_POST['booking_city']  ?? '')));
$hear   = htmlspecialchars(strip_tags(trim($_POST['escuta'] ?? $_POST['hearing_loss']  ?? '')));
$origin = htmlspecialchars(strip_tags(trim($_POST['origin'] ?? 'site')));

// ── Configuração SMTP ──────────────────────────────────────────────────────
$smtp_host = 'smtp.hostinger.com';
$smtp_port = 465;
$smtp_user = 'envio@centroauditivomacae.com.br';
$smtp_pass = '|v05HLDr!>Q';
$from_name = 'Centro Auditivo Macaé';
$from_addr = 'envio@centroauditivomacae.com.br';
$to_addr   = 'loja00004@gmail.com';

// ── Mensagem ───────────────────────────────────────────────────────────────
$subject_raw = 'Novo lead - Centro Auditivo Macaé';
$subject     = '=?UTF-8?B?' . base64_encode($subject_raw) . '?=';

$body  = "Novo lead recebido pelo site\n";
$body .= "================================\n";
$body .= "Nome:      $name\n";
$body .= "Telefone:  $phone\n";
$body .= "E-mail:    $email\n";
$body .= "Cidade:    $city\n";
if ($hear) $body .= "Dificuldade: $hear\n";
$body .= "Formulário: $origin\n";
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

echo json_encode(['ok' => (bool)$sent]);
