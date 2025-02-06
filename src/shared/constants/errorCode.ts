type ErrorCodeType = {
  [key: string]: { title: string; description: string };
};

export const ERROR_CODE: ErrorCodeType = Object.freeze({
  default: {
    title: '알 수 없는 오류가 발생했습니다.',
    description: '문제가 지속되면 관리자에게 문의하세요.'
  },
  // axios error
  ERR_NETWORK: {
    title: '지금은 접속이 원활하지 않습니다.',
    description:
      '인터넷 연결을 확인하고, 문제가 지속되면 관리자에게 문의하세요.'
  },
  ECONNABORTED: {
    title: '요청 시간이 초과되었습니다.',
    description: '서버가 응답하지 않아서 요청이 취소되었습니다.'
  },

  // http status code 및 정의된 코드
  400: {
    title: '요청이 잘못되었습니다.',
    description: '잘못된 데이터나 요청 형식으로 인해 요청을 처리할 수 없습니다.'
  },
  401: {
    title: '인증이 필요합니다.',
    description: '해당 요청을 수행하기 위해서는 로그인이 필요합니다.'
  },
  403: {
    title: '접근 권한이 없습니다.',
    description: '요청한 리소스에 접근할 수 있는 권한이 없습니다.'
  },
  404: {
    title: '요청하신 페이지를 찾을 수 없습니다.',
    description: '요청하신 페이지가 존재하지 않거나, URL이 잘못 입력되었습니다.'
  },
  500: {
    title: '알 수 없는 오류가 발생했습니다.',
    description: '문제가 지속되면 관리자에게 문의하세요.'
  }
});
