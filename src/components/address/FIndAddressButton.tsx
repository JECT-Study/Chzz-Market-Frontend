import { useEffect } from 'react';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

const SCRIPT_URL =
  '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const FindAddressButton = () => {
  const navigate = useNavigate();
  // script load

  // handler

  // input
  const handleOpen = () => {
    new window.daum.Postcode({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onComplete: (data: any) => {
        const roadAddress = data.address;
        const { jibunAddress } = data;
        const { zonecode } = data;

        navigate('/')
      },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        handleOpen();
      }}
    >
      주소 찾기
    </Button>
  );
};

export default FindAddressButton;
