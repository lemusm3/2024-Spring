/* B"H
*/

import type { DataEnvelope } from "@/model/transportTypes";
import type { User } from "@/model/users";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import * as myFetch from "@/model/myFetch";
import { useToast } from "vue-toastification";

const session  = reactive({
    user: null as User | null,
    isLoading: 0,
});

export function useLogin() {
    const router = useRouter();
    return {
        async login(user: User) {
            const x = await api<User>("users/login", user);
            if(x){
                session.user = x.data;
                router.push("/");
            }
        },
        logout() {
            session.user = null;
            router.push("/login");
        }
    };
}

export const refSession = () => session;

export function api<T>(action: string, data?: unknown, method?: string){
    session.isLoading++;
    return myFetch.api<T>(action, data, method)
    .then(x=>{
        if(!x.isSuccess){
            showError(x);
        }
        return x;
    })
    .catch(showError)
    .finally(() => session.isLoading--);
}

const toast = useToast();
export function showError(error: any){
    console.error(error);
    toast.error(error.message || error);
}