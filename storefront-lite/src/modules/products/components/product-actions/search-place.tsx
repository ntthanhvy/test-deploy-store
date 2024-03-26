"use client"

import { Status, Wrapper } from "@googlemaps/react-wrapper"
import { GG_API_KEY } from "@lib/constants"
import Spinner from "@modules/common/icons/spinner"
import { useEffect, useRef } from "react"
import { useStoreLocation } from "../store-location-search"

const render = (status: Status): React.ReactElement => {
  if (status === Status.FAILURE) return <h3>Error</h3>
  return <Spinner />
}

export default function SearchPlace() {
  return (
    <Wrapper apiKey={GG_API_KEY} render={render} libraries={["places"]}>
      <SearchPlaceComponent />
    </Wrapper>
  )
}

function SearchPlaceComponent() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { setPlace } = useStoreLocation()

  useEffect(() => {
    if (!inputRef.current) return

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode"],
      componentRestrictions: { country: "gb" },
    })

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace()
      // console.log(place)
      setPlace(place)
    })
  }, [])

  return (
    <>
      <input
        type="text"
        className="px-3 py-3 w-full bg-transparent placeholder:text-black text-black focus:outline-none focus:ring-0"
        placeholder="Postcode or town"
        // value={search}
        // onChange={(e) => setSearch(e.target.value)}
        ref={inputRef}
      />
    </>
  )
}
