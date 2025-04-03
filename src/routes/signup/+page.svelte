<script lang="ts">
    import type { PageData } from './$types';
    import { Button } from '$lib/components/ui/button';
    import { goto } from '$app/navigation';
    import { toast } from 'svelte-sonner';
    import { signUp } from '$lib/auth/auth.client';

    let { data }: { data: PageData } = $props();

    let name = $state('');
    let email = $state('');
    let password = $state('');
    let confirmPassword = $state('');
    let isLoading = $state(false);
    let isFormValid = $derived(
        name && 
        email && 
        password && 
        confirmPassword && 
        password === confirmPassword && 
        !isLoading
    );

    async function handleSubmit() {
        if (!name || !email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        isLoading = true;
        try {
            await signUp.email(
                {
                    name,
                    email, 
                    password,
                    callbackURL: '/dashboard'
                },
                {
                    onError: (ctx) => {
                        toast.error(ctx.error.message);
                    }
                }
            );
        } catch (error) {
            toast.error('Failed to sign up. Please try again.');
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
    <div class="w-full max-w-md space-y-8">
        <div class="text-center">
            <h1 class="text-3xl font-bold tracking-tight">Create an account</h1>
            <p class="mt-2 text-sm text-muted-foreground">
                Sign up to get started with Price Point
            </p>
        </div>

        <form onsubmit={handleSubmit} class="mt-8 space-y-6">
            <div class="space-y-4">
                <div>
                    <label for="name" class="block text-sm font-medium text-foreground">
                        Full Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        bind:value={name}
                        required
                        class="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Enter your full name"
                    />
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-foreground">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        bind:value={email}
                        required
                        class="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-foreground">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        bind:value={password}
                        required
                        class="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Create a password"
                    />
                </div>

                <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-foreground">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        bind:value={confirmPassword}
                        required
                        class="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Confirm your password"
                    />
                </div>
            </div>

            <Button
                type="submit"
                class="w-full"
                disabled={!isFormValid}
            >
                {#if isLoading}
                    Creating account...
                {:else}
                    Sign up
                {/if}
            </Button>
        </form>

        <div class="text-center text-sm">
            <p class="text-muted-foreground">
                Already have an account?{' '}
                <a href="/signin" class="text-primary hover:underline">
                    Sign in
                </a>
            </p>
        </div>
    </div>
</div>