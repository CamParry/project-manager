import { Button } from "@/components/button";
import { GuestLayout } from "@/components/layout-guest";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn't receive the email, we will gladly send you
                another.
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <Button disabled={processing}>
                        Resend Verification Email
                    </Button>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="rounded-md text-sm text-sky-600 dark:text-sky-400 underline hover:text-sky-700 dark:hover:text-sky-300 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
