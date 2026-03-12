import React, { useEffect, useState } from 'react'
import PackageCard from '../components/PackageCard'
import { supabase } from '../supabaseClient'

const Kashmir = () => {
  const [kashmirPackages, setKashmirPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchKashmirData = async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .ilike('category', '%kashmir%') 

      if (error) {
        console.error("Error fetching Kashmir packages:", error)
      } else {
        setKashmirPackages(data)
      }
      setLoading(false)
    }

    fetchKashmirData()
  }, [])

  if (loading) return <div className="text-center py-10 text-xl font-medium text-blue-500">Kashmir Tours Load ho rahe hain...</div>

  return (
    <div className="package-container flex flex-wrap gap-5 justify-center py-10">
      {kashmirPackages.length > 0 ? (
        kashmirPackages.map(pkg => (
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
        <p className="text-gray-500">Database mein Kashmir ka koi package nahi mila.</p>
      )}
    </div>
  )
}

export default Kashmir