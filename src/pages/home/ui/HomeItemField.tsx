import { PartialAsyncBoundary } from "@/shared";
import { ReactNode } from "react";

const HomeItemField = ({ children, name }: { children: ReactNode, name: string }) => {
  return (
    <section className='flex flex-col w-full gap-6'>
      <label className='text-heading3'>{name}</label>
      <div className='flex gap-4 min-h-[16rem] h-[16rem]'>
        <PartialAsyncBoundary >
          {children}
        </PartialAsyncBoundary>
      </div>
    </section>
  );
}

export default HomeItemField;
