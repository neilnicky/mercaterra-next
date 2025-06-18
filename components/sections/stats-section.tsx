const stats = [
  { label: "Active Farmers", value: "500+" },
  { label: "Fresh Products", value: "2,000+" },
  { label: "Happy Customers", value: "10,000+" },
  { label: "Cities Served", value: "50+" },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-green-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-green-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
