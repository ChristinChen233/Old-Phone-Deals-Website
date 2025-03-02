# Connect to Exchange Online
$UserCredential = Get-Credential
Connect-ExchangeOnline -UserPrincipalName $UserCredential.UserName -Password $UserCredential.Password
# Enable SMTP AUTH for the entire tenant
Set-TransportConfig -SmtpClientAuthenticationDisabled $false
# Verify if SMTP AUTH is enabled
Get-TransportConfig | Format-List SmtpClientAuthenticationDisabled
# Enable SMTP AUTH for a specific mailbox
Set-CASMailbox -Identity 'user@domain.com' -SmtpClientAuthenticationDisabled $false
# Disconnect from Exchange Online
Disconnect-ExchangeOnline -Confirm:$false