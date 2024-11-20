// Hooks
import { useEffect } from "react";
import { useGetAllowance } from "../hooks/useGetAllowance";

// Components
import Loading from "./Loading/Loading";


const Allowance = (userId, month) => {

  const {allowance, loading, loadData: loadAllowance} = useGetAllowance(userId, month);

  useEffect(() => {
    loadAllowance();
  },[loadAllowance]);

  if(loading) return <Loading />;
  
  return (
    <>R$ {Number.parseFloat(allowance).toFixed(2)}</>
  )
};

export default Allowance;