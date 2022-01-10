import {useLocation} from "react-router-dom";
import React from "react";

export function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}


export const IPFS_BASE_URL = "infura-ipfs.io"