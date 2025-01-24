import { useGetPreAuctionDetails } from "@/features/details";
import { AuctionForm } from "@/shared";
import { LoaderFunction, useLoaderData } from "react-router-dom";

export const EditAuction = () => {
  const auctionId = useLoaderData() as number;
  const { preAuctionDetails } = useGetPreAuctionDetails(auctionId);

  return <AuctionForm preAuction={preAuctionDetails} />
}

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};