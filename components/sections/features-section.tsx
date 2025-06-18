import { Leaf, Users, Truck, Shield } from "lucide-react"

const features = [
  {
    icon: Leaf,
    title: "Fresh & Organic",
    description: "Directly sourced from local farms, ensuring maximum freshness and quality.",
  },
  {
    icon: Users,
    title: "Support Local Farmers",
    description: "Help your community thrive by supporting local agricultural businesses.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable delivery straight from farm to your doorstep.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Every product is carefully inspected to meet our high quality standards.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Why Choose MercaTerra?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We connect you directly with local farmers, ensuring the freshest produce and supporting your community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
