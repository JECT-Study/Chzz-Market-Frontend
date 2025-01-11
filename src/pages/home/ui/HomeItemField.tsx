import { LocalAPIAsyncBoundary } from "@/shared";
import { ReactNode } from "react";

const HomeItemField = ({ children, name }: { children: ReactNode, name: string }) => {
  return (
    <section className='flex flex-col w-full gap-4'>
      <label className='text-heading3'>{name}</label>
      <div className='flex gap-4'>
        <LocalAPIAsyncBoundary >
          {children}
        </LocalAPIAsyncBoundary>
      </div>
    </section>
  );
}

export default HomeItemField;
