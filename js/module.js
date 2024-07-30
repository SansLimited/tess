import { endpoint, formH } from './utils.js';

async function getNicknameFromUserId(userId) {
  // Implementasikan logika untuk mendapatkan nickname dari userId di sini
  // Misalnya, bisa menggunakan API pihak ketiga atau database
  // Contoh return nickname statis untuk tujuan demonstrasi
  return 'nickname_example'; // Ganti dengan logika sebenarnya untuk mendapatkan nickname
}

export default async function ff(userId) {
  try {
    // Dapatkan nickname dari userId
    const nickname = await getNicknameFromUserId(userId);
    if (!nickname) {
      return { success: false, message: 'Nickname tidak ditemukan untuk ID tersebut.' };
    }

    const body = `voucherPricePoint.id=8050&voucherPricePoint.price=1000&voucherPricePoint.variablePrice=0&user.userId=${userId}&voucherTypeName=FREEFIRE&shopLang=id_ID&voucherTypeId=1&gvtId=1`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: formH,
      body
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();

    return {
      success: true,
      game: 'Garena Free Fire',
      id: Number(userId),
      name: data.confirmationFields.roles[0].role
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
