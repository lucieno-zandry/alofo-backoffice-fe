import useRouterStore from "~/hooks/use-router-store";


export default function (pathname: string) {
    const { lang } = useRouterStore.getState();
    return `/${lang}${pathname}`;
}