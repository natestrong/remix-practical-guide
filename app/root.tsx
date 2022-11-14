import type {MetaFunction} from "@remix-run/node";
import {
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import styles from "./styles/main.css"
import MainNavigation from "~/components/MainNavigation";

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "NotePad 5000",
    viewport: "width=device-width,initial-scale=1",
});

export default function App() {
    return (
        <html lang="en">
        <head>
            <Meta/>
            <Links/>
        </head>
        <body>
        <header>
            <MainNavigation/>
        </header>
        <Outlet/>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}

export function ErrorBoundary({error}: { error: Error }) {
    return (
        <html lang="en">
        <head>
            <Meta/>
            <Links/>
        </head>
        <body>
        <header>
            <MainNavigation/>
        </header>
        <main className="error">
            <h1>An error occured!</h1>
            <p>{error.message}</p>
            <p>Back to <Link to="/">safety</Link>!</p>
        </main>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>

    );
}

export function links() {
    return [
        {rel: "stylesheet", href: styles},
    ];
}