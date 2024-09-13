"use client"

import { Country, State, City } from "country-state-city"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { MapPinIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

type TCountry = {
    value: {
        latitude: string
        longitude: string
        isoCode: string
    }
    label: string
} | null

type TState = {
    value: {
        latitude: string
        longitude: string
        countryCode: string
        name: string
        isoCode: string
    }
    label: string
} | null

type TCity = {
    value: {
        latitude: string
        longitude: string
        countryCode: string
        name: string
        stateCode: string
    }
    label: string
} | null

const countries = Country.getAllCountries().map((country) => ({
    value: {
        latitude: country.latitude,
        longitude: country.longitude,
        isoCode: country.isoCode,
    },
    label: country.name,
}))
  
export function CityPicker() {

    const [selectedCountry, setSelectedCountry] = useState<TCountry>(null)

    const [selectedState, setSelectedState] = useState<TState>(null)

    const [selectedCity, setSelectedCity] = useState<TCity>(null)

    const router = useRouter()

    const handleCountryChange = (countName: string) => {
        const country = countries.find((country) => country.label === countName) as TCountry
        setSelectedCountry(country)
        setSelectedCity(null)
        setSelectedState(null)
    }

    const handleStateChange = (stateName: string) => {
        if (selectedCountry) {
            const state = State.getStatesOfCountry(
              selectedCountry.value.isoCode
            )?.find((s) => s.name === stateName);
            if (state) {
              setSelectedState({
                value: {
                  latitude: state.latitude!,
                  longitude: state.longitude!,
                  countryCode: state.countryCode,
                  name: state.name,
                  isoCode: state.isoCode,
                },
                label: state.name,
              });
            }
          }
    }

    const handleCityChange = (cityName: string) => {
        if (selectedCountry) {
          const city = City.getCitiesOfCountry(selectedCountry.value.isoCode)?.find(
            (c) => c.name === cityName
          );
          if (city) {
            setSelectedCity({
              value: {
                latitude: city.latitude!,
                longitude: city.longitude!,
                countryCode: city.countryCode,
                name: city.name,
                stateCode: city.stateCode,
              },
              label: city.name,
            });
          }
        }
      };

      const handleContinue = () => {
        router.push(
          `/weather/${selectedCity?.value.name}/${selectedCity?.value.latitude}/${selectedCity?.value.longitude}`
        );
      };

  return (
    <Card className="bg-green-200/40 border-none w-full md:w-96">
  <CardHeader className="flex items-center">
    <CardTitle>
        <div className="flex items-center text-white">
            <MapPinIcon className="size-6 mr-2" />
            <h2>Sélectionnez une ville</h2>
        </div>
    </CardTitle>
  </CardHeader>

  <CardContent>
    <div className="space-y-4">
    
    {/* pays */}
    <Select
    onValueChange={handleCountryChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="Sélectionnez un pays" />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country, index: number) => (
            <SelectItem key={index} value={country.label}>
                {country.label}
                </SelectItem>
        ))}
      </SelectContent>
    </Select>

    {/* district */}
    <Select
    onValueChange={handleStateChange}
    disabled={!selectedCountry}
    >
      <SelectTrigger>
        <SelectValue placeholder="Sélectionnez un district" />
      </SelectTrigger>
      <SelectContent>
        {selectedCountry && State.getStatesOfCountry(selectedCountry.value.isoCode)?.map((state, index: number) => (
            <SelectItem key={index} value={state.name}>
                {state.name}
                </SelectItem>
        ))}
      </SelectContent>
    </Select>

    {/* ville */}
    <Select
    onValueChange={handleCityChange}
    disabled={!selectedCountry ||!selectedState}
    >
      <SelectTrigger>
        <SelectValue placeholder="Sélectionnez une ville" />
      </SelectTrigger>
      <SelectContent>
      {selectedCountry &&
                City.getCitiesOfCountry(selectedCountry.value.isoCode)?.map(
                  (city, index: number) => (
                    <SelectItem key={index} value={city.name}>
                      {city.name}
                    </SelectItem>
                  )
                )}
      </SelectContent>
    </Select>

    </div>
  </CardContent>

  <CardFooter className="flex justify-end">
    
    <Button 
    disabled={!selectedCountry || !selectedState || !selectedCity}
    onClick={handleContinue}
    className="bg-green-500 hover:bg-green-500/90">
    Continuer
    </Button>
  </CardFooter>
</Card>
  )
}
