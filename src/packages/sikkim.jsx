import React, { useEffect, useState } from 'react'
import PackageCard from '../components/PackageCard'
import { supabase } from '../supabaseClient'

const Sikkim = () => {
  const [sikkimPackages, setSikkimPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSikkimData = async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .ilike('category', '%sikkim%') 

      if (error) {
        console.error("Error fetching Sikkim packages:", error)
      } else {
        setSikkimPackages(data)
      }
      setLoading(false)
    }

    fetchSikkimData()
  }, [])

  if (loading) return <div className="text-center py-10 text-xl font-semibold text-green-700">Sikkim Tours Load ho rahe hain...</div>

  return (
    <div className="package-container flex flex-wrap gap-5 justify-center py-10">
      {sikkimPackages.length > 0 ? (
        sikkimPackages.map(pkg => (
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
        <p className="text-gray-500">Database mein Sikkim ka koi package nahi mila.</p>
      )}
    </div>
  )
}

export default Sikkim