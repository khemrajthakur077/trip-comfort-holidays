import React, { useEffect, useState } from 'react'
import PackageCard from '../components/PackageCard'
import { supabase } from '../supabaseClient'

const Uttarakhand = () => {
  const [uttarakhandPackages, setUttarakhandPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUttarakhandData = async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .ilike('category', '%uttarakhand%') 

      if (error) {
        console.error("Error fetching Uttarakhand packages:", error)
      } else {
        setUttarakhandPackages(data)
      }
      setLoading(false)
    }

    fetchUttarakhandData()
  }, [])

  if (loading) return <div className="text-center py-10 text-xl font-bold text-emerald-800">Devbhoomi Uttarakhand Tours Load ho rahe hain...</div>

  return (
    <div className="package-container flex flex-wrap gap-5 justify-center py-10">
      {uttarakhandPackages.length > 0 ? (
        uttarakhandPackages.map(pkg => (
          <PackageCard
            key={pkg.id}
            id={pkg.id} 
            image={pkg.image_url} 
            title={pkg.title}
            duration={pkg.duration}
            from={pkg.from_location} 
            to={pkg.to_location}
            hotel={pkg.hotel}
            meal={pkg.meal}
            oldPrice={pkg.old_price}
            price={pkg.price}
          />
        ))
      ) : (
        <p className="text-gray-500">Database mein Uttarakhand ka koi package nahi mila.</p>
      )}
    </div>
  )
}

export default Uttarakhand