import type { LoaderFunctionArgs } from "react-router";
import useRouterStore from "~/hooks/use-router-store";


export default function (pathname: string, loaderFunctionArgs?: LoaderFunctionArgs) {
    const { lang } = useRouterStore.getState();
    return `/${lang}`;
}