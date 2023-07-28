'use client'

import React, { ChangeEvent, useState } from 'react'
import Select from 'react-select'
import { Tab } from "@headlessui/react";
import Graph from "./Graph";
import { countriesList, socialValuesList, demoCrit } from "./constants"


const CountryExplorer = () => {


    const [selectedCountry, setCountry] = useState<string>("argentina")
    const [selectedSocialValue, setSocialValue] = useState<string>("work_score")
    const [selectedDemographCriteria, setDemographicCriteria] = useState<string>("age_group")

    const handleSelectContry = (newSelection: string): void => {
        setCountry(newSelection)
    }

    const handleSelectSocialValue = (e: ChangeEvent): void => {
        setSocialValue(e.target.id)
    }

    const handleSelectDemoCriteria = (value: string): void => {
        setDemographicCriteria(value)
    }


    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(" ");
      }


    return (
        <div className="grid gap-4 grid-cols-3 w-full ">
            <div>
                {/* CountrySelector */}
                <div className='px-5 mt-5'>
                    <h2 className='text-black text-2xl my-2'>Select a country</h2>
                    <Select
                        onChange={(newValues) => {
                            if (newValues != null) {
                                let x: string = newValues.value
                                handleSelectContry(x)
                            }
                        }}
                        className="basic-single w-full text-black"
                        classNamePrefix="select"
                        defaultValue={countriesList[0]}
                        name="Select Country"
                        options={countriesList} />
                </div>
                {/* Social Value Group */}
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
            {/* Tab Group and with Graph Child */}
            <div className='col-span-2'>
                <div className="w-full px-2 py-5 sm:px-0">
                    <Tab.Group
                        onChange={(index) => {
                            handleSelectDemoCriteria(demoCrit[index].value);
                        }}
                    >
                        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                            {demoCrit.map((demoCriteria) => (
                                <Tab
                                    key={demoCriteria.value}
                                    value={demoCriteria.value}
                                    className={({ selected }) =>
                                        classNames(
                                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                                            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                            selected
                                                ? "bg-white shadow"
                                                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                                        )
                                    }
                                >
                                    {demoCriteria.label}
                                </Tab>
                            ))}
                        </Tab.List>
                        <div className="bg-white rounded-md mt-4">
                            <Graph
                                country={selectedCountry}
                                social_value={selectedSocialValue}
                                demo_crit={selectedDemographCriteria}
                            />
                        </div>
                    </Tab.Group>
                </div>
            </div>
        </div>
    )
}

export default CountryExplorer