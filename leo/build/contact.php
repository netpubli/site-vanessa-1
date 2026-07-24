<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method not allowed']);
    exit;
}

$name   = htmlspecialchars(strip_tags(trim($_POST['nome']   ?? $_POST['booking_name']  ?? '')));
$phone  = htmlspecialchars(strip_tags(trim($_POST['fone']   ?? $_POST['booking_phone'] ?? '')));
$email  = htmlspecialchars(strip_tags(trim($_POST['email']  ?? $_POST['booking_email'] ?? '')));
$city   = htmlspecialchars(strip_tags(trim($_POST['cidade'] ?? $_POST['booking_city']  ?? '')));
$hear   = htmlspecialchars(strip_tags(trim($_POST['escuta'] ?? $_POST['hearing_loss']  ?? '')));
$origin = htmlspecialchars(strip_tags(trim($_POST['origin'] ?? 'site')));

$to      = 'leonardo@centroauditivomacae.com.br';
$subject = '=?UTF-8?B?' . base64_encode('Novo lead - Centro Auditivo Macaé') . '?=';

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

$headers  = "From: noreply@centroauditivomacae.com.br\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";

$sent = @mail($to, $subject, $body, $headers);

echo json_encode(['ok' => (bool)$sent]);
