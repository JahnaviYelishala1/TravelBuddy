"use client"
import { Button } from '@/components/ui/button';
import { SignInButton, useUser, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const menuOptions = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact Us', path: '/contact-us' },
];

function Header() {
  const { user } = useUser();
  const path = usePathname();

  return (
    <div className="p-4 flex justify-between items-center border-b shadow-sm">
      {/* LOGO */}
      <div className="flex gap-2 items-center">
        <Image
          src="/placeholder.png"
          alt="logo"
          width={50}
          height={50}
          className="mt-2 ml-2"
        />
        <h2 className="font-bold text-2xl">TravelBuddy</h2>
      </div>

      {/* MENU */}
      <div className="flex gap-6">
        {menuOptions.map((menu, index) => (
          <Link key={index} href={menu.path}>
            <h2 className="text-lg hover:scale-105 transition-all cursor-pointer">
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* USER ACTIONS */}
      <div className="flex items-center gap-4">
        {!user ? (
          <SignInButton mode="modal">
            <Button>Get Started</Button>
          </SignInButton>
        ) : (
          <>
            {path === '/create-new-trip' ? (
              <Link href="/my-trips">
                <Button>My Trips</Button>
              </Link>
            ) : (
              <Link href="/create-new-trip">
                <Button>Create New Trip</Button>
              </Link>
            )}

            {/* Clerk's user menu */}
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10" // size of avatar
                }
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
