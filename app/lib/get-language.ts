import useRouterStore from "~/hooks/use-router-store";

export default function () {
    const { lang } = useRouterStore.getState();
    return lang;
}