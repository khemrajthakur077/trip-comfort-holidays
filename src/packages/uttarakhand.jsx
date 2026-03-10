import React from 'react'
import PackageCard from '../components/PackageCard'
import { packages } from '../data/packages'

const Uttarakhand = () => {

  const uttarakhandPackages = packages.filter(
    pkg => pkg.category === "uttarakhand"
  )

  return (
    <div className="package-container flex flex-wrap gap-5 justify-center">

      {uttarakhandPackages.map(pkg => (
        <PackageCard
          key={pkg.id}
          image={pkg.image}
          title={pkg.title}
          duration={pkg.duration}
          from={pkg.from}
          to={pkg.to}
          hotel={pkg.hotel}
          meal={pkg.meal}
          oldPrice={pkg.oldPrice}
          price={pkg.price}
        />
      ))}

    </div>
  )
}

export default Uttarakhand