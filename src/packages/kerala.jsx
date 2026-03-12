import React, { useEffect, useState } from 'react'
import PackageCard from '../components/PackageCard'
import { supabase } from '../supabaseClient'

const Kerala = () => {
  const [keralaPackages, setKeralaPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchKeralaData = async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .ilike('category', '%kerala%') 

      if (error) {
        console.error("Error fetching Kerala packages:", error)
      } else {
        setKeralaPackages(data)
      }
      setLoading(false)
    }

    fetchKeralaData()
  }, [])

  if (loading) return <div className="text-center py-10 text-xl font-medium text-teal-600">Kerala Backwaters Load ho rahe hain...</div>

  return (
    <div className="package-container flex flex-wrap gap-5 justify-center py-10">
      {keralaPackages.length > 0 ? (
        keralaPackages.map(pkg => (
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
        <p className="text-gray-500">Database mein Kerala ka koi package nahi mila.</p>
      )}
    </div>
  )
}

export default Kerala