import { useGetPreAuctionDetails } from "@/features/details";
import { AuctionForm } from "@/shared";
import { LoaderFunction, useLoaderData } from "react-router-dom";

export const EditAuction = () => {
  const preAuctionId = useLoaderData() as number;
  const { preAuctionDetails } = useGetPreAuctionDetails(preAuctionId);

  return <AuctionForm preAuction={preAuctionDetails} />
}

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { preAuctionId } = params;

  return preAuctionId;
};