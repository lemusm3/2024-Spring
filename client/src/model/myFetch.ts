/* B"H
*/
import type { DataEnvelope } from "./transportTypes";


export const API_ROOT = import.meta.env.VITE_API_ROOT;


export function rest(url: string, data?: unknown, method?: string){
    return fetch(url, {
        method: method ?? (data ? "POST" : "GET"),
        headers: {
            "Content-Type": "application/json",
        },
        body: data ? JSON.stringify(data) : undefined,
    })
    .then(x => x.json())
}

export function api<T>(action: string, data?: unknown, method?: string): Promise<DataEnvelope<T>>{
    return rest(`${API_ROOT}/${action}`, data, method);
}