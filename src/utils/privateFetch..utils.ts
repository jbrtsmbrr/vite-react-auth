
export async function PrivateFetch(input: RequestInfo | URL, init?: RequestInit) {
    // Executes original request
    const response = await fetch(input, init);

    // If original requests fails due to unauthorized access
    if (response.status === 401) {
        // Try to refresh token
        const refresh_response = await fetch("http://localhost:4004/auth/refresh", {
            method: "POST",
            credentials: "include",
        });

        // If refresh token is successful reexecute original request
        if (refresh_response.status === 200) {
            return await fetch(input, init)
        }
    }

    // Returns normal response
    return response
}