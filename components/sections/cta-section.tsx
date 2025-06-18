import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Ready to Experience Farm-Fresh Goodness?</h2>
          <p className="text-lg text-gray-600">
            Join thousands of satisfied customers who choose fresh, local produce delivered directly from farms to their
            tables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/market">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="lg" variant="outline">
                Become a Farmer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
