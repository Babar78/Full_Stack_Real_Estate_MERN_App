import React, {
    useContext, useRef
} from 'react'
import UserDetailsContext from '../context/userDetailsContext';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchAllBookings, getAllFav } from '../utils/api';
import { useQuery } from 'react-query';

const useBookings = () => {

    const { userDetails, setUserDetails } = useContext(UserDetailsContext);

    const queryRef = useRef();
    const { user } = useAuth0();

    const { data, isLoading, isError, refetch } = useQuery(
        {
            queryKey: "allBookings",
            queryFn: () => fetchAllBookings(user?.email, userDetails?.token),
            onSuccess: (data) =>
                setUserDetails((prev) => ({ ...prev, bookings: data }))
            ,
            enabled: user !== undefined,
            staleTime: 30000

        }
    )

    queryRef.current = refetch;

    React.useEffect(() => {
        queryRef.current && queryRef.current();
    }, [userDetails?.token])


    return (
        {
            data, isLoading, isError, refetch
        }
    )
}

export default useBookings