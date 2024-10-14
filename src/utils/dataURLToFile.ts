export const dataURLtoFile = (dataURL: string): File => {
  // DataURL에서 Base64와 MIME 타입 추출
  const arr = dataURL.split(',');
  const mimeMatch = arr[0].match(/data:(.*?);base64/);
  if (!mimeMatch) throw new Error('잘못된 DataURL형식입니다.');

  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  // Base64를 바이트 배열로 변환
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  // MIME 타입으로부터 확장자 추출
  const mimeToExtensionMap: { [key: string]: string } = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
  };

  // MIME 타입이 지도된 확장자가 있는 경우에만 파일 생성
  const extension = mimeToExtensionMap[mime];
  if (!extension) throw new Error(`${mime}은 지원되지 않는 MIME 타입입니다.`);

  const fileName = `image.${extension}`; // idx를 사용한 파일 이름

  // 새로운 File 객체 생성
  return new File([u8arr], fileName, { type: mime });
};
