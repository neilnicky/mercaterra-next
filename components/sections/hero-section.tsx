"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Leaf } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-emerald-50 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Fresh from <span className="text-green-600">Farm</span>
                <br />
                Direct to <span className="text-green-600">You</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Connect directly with local farmers and get the freshest produce
                delivered to your doorstep. No middlemen, just pure farm-fresh
                goodness.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/market">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  Join as Farmer
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=srgb&dpr=1&w=600 ?? /placeholder.svg?height=600&width=800"
                alt="Fresh vegetables and produce"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
               <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">500+</p>
                    <p className="text-gray-600">Fresh Products</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
