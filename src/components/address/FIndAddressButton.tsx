import { useEffect } from 'react';
import Button from '../common/Button';

interface Props {
  onCompleted: (roadAddress: string, jibun: string, zonecode: string) => void;
}

const SCRIPT_URL =
  '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const FindAddressButton = ({ onCompleted }: Props) => {
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

        onCompleted(roadAddress, jibunAddress, zonecode);
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
