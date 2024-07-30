import { endpoint, formH, getUrl, timeNow } from './utils.js';

async function getIdFromUserId(userId) {
  // Implementasikan logika untuk mendapatkan nickname dari userId di sini
  // Misalnya, bisa menggunakan API pihak ketiga atau database
  // Contoh return nickname statis untuk tujuan demonstrasi
  return 'nickname_example'; // Ganti dengan logika sebenarnya untuk mendapatkan nickname
}

export default async function ff(userId) {
  // Dapatkan nickname dari userId
  const nickname = await getIdFromUserId(userId);
  if (!nickname) {
    return { success: false, message: 'Nickname tidak ditemukan untuk ID tersebut.' };
  }

  const body = `voucherPricePoint.id=8050&voucherPricePoint.price=1000&voucherPricePoint.variablePrice=0&user.userId=${userId}&voucherTypeName=FREEFIRE&shopLang=id_ID&voucherTypeId=1&gvtId=1`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: formH,
    body
  });

  const data = await response.json();

  return {
    success: true,
    game: 'Garena Free Fire',
    id: Number(userId),
    name: data.confirmationFields.roles[0].role
  };
}
