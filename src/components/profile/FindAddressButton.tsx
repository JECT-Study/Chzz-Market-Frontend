import { useEffect } from 'react';
import Button from '../common/Button';

interface Props {
  onCompleted: (address: string) => void;
  children: React.ReactNode;
}

const SCRIPT_URL =
  '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const FindAddressButton = ({ onCompleted, children }: Props) => {
  // 스크립트 코드

  // 핸들러

  // 입력
  // const handleOpen = () => {
  //   new window.daum.Postcode({
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     onCompleted: (data: any) => {
  //       onCompleted(data);
  //     },
  //   })
  // };

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
    <Button type="button" size="small" onClick={() => {}}>
      {children}
    </Button>
  );
};

export default FindAddressButton;
