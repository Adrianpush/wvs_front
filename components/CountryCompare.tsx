'use client'

import React, { ChangeEvent, useState } from 'react'
import GraphCompare from './GraphCompare'
import { countriesList, socialValuesList } from "./constants"

interface Country {
    value: string,
    label: string,
    color: string,
}


const CountryCompare = () => {


    const [selectedCountries, setSelectedCountries] = useState<Country[]>([])
    const [selectedSocialValue, setSelectedSocialValue] = useState<string>("work_score")
    const [graphTitle, setGraphTitle] = useState<string>("Importance of work")

    const handleSelectSocialValue = (e: ChangeEvent): void => {
        setSelectedSocialValue(e.target.id)
        for (const sValue of socialValuesList) {
            if( sValue.id == e.target.id){
                setGraphTitle(sValue.name)
                break
            }
        }
    }

    const toggleCountry = (e: ChangeEvent): void => {

        let new_arr = [];

        for (let i = 0; i < countriesList.length; i++) {

            if (e.target.id == countriesList[i].value) {
                const selectedCountry = countriesList[i]
                const exists = selectedCountries.some((obj) => obj.value === selectedCountry.value && 
                selectedCountry.label === selectedCountry.label
                && obj.color === selectedCountry.color);

                if (exists){                    
                    new_arr = selectedCountries.filter((item) => item.color !== selectedCountry.color &&
                    item.label !== selectedCountry.label && item.value !== selectedCountry.value);
                    
                } else {
                    new_arr = [...selectedCountries, selectedCountry];
                }
                console.log(new_arr)
                setSelectedCountries(new_arr);
                break
            }
        }

    };

    return (
        <>
            <div className='grid grid-cols-3 w-full'>
                <div className='col-span-4'>
                    {/* Country Selector */}
                    <div className='mt-2'><h2 className='text-black text-2xl'>Select countries: </h2></div>
                    {countriesList.map((country) => (
                        <div key={country.value} className='px-2 my-2 inline-block'>
                            <input
                                type="checkbox"
                                id={country.value}
                                value={country.value}
                                name="countries"
                                className="peer hidden"
                                onChange={toggleCountry}
                            />
                            <label
                                htmlFor={country.value}
                                className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 cursor-pointer hover:bg-gray-400 transition-colors
                         peer-checked:bg-indigo-300"
                            >
                                {country.label}
                            </label>
                        </div>

                    ))}
                </div>
                <div className='grid-item'>

                    {/* Value Selector */}
                    <div className="w-full">
                        <fieldset>
                            <div className='grid-cols-1 px-5 mt-5'>
                                <h2 className='text-black text-2xl'>Select a social value</h2>
                                {socialValuesList.map((socialValue: { id: string, name: string }) => (
                                    <div key={socialValue.id} className='px-5 my-2'>
                                        <input
                                            type="radio"
                                            id={socialValue.id}
                                            value={socialValue.name}
                                            name="social_value"
                                            className="peer hidden"
                                            onChange={handleSelectSocialValue}
                                            checked={selectedSocialValue == socialValue.id}

                                        />
                                        <label
                                            htmlFor={socialValue.id}
                                            className="block w-full px-4 py-2 rounded-md bg-gray-300 text-gray-800 cursor-pointer hover:bg-gray-400 transition-colors
                         peer-checked:bg-indigo-300"
                                        >
                                            {socialValue.name}
                                        </label>
                                    </div>

                                ))}
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className='col-span-2'>
                    <h2 className="text-neutral-900 text-center pt-2">{graphTitle}</h2>
                    <GraphCompare
                        countries={selectedCountries} social_value={selectedSocialValue}
                    />
                </div>

            </div>
        </>
    )
}

export default CountryCompare