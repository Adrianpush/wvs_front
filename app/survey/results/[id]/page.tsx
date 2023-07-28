"use client"

import React, { useEffect, useState } from 'react'


interface DataDict {
  user_work_score: number;
  user_fam_score: number;
  user_religion_score: number;
  user_gender_equality: number;
  user_ethnic_rel_tolerance: number;
  user_sex_minority_tolerance: number;
  country_name: string;
  country_work_score: number;
  country_fam_score: number;
  country_religion_score: number;
  country_gender_equality: number;
  country_ethnic_rel_tolerance: number;
  country_sex_minority_tolerance: number;
}

const formatNumberWithTwoDecimals = (number: number | null): string => {
  if (number === null) {
    return '-';
  }
  return (+number).toFixed(2);
};

const formatCountryName = (name: string): string => {
  return name
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


const page = ({ params }: { params: { id: string } }) => {

  const [data, setData] = useState<DataDict | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = `http://127.0.0.1:5000/api/results/?form_id=${params.id}`
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData: DataDict = await response.json();

        setData(jsonData);
        setError(null);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
      }
    };
    fetchData();
  }, []);




  return (
    <div>
      {error && <p>{error}</p>}
      {data && (
        <>
        <div className="bg-slate-600 rounded-lg shadow-md w-2/3 m-auto p-5 my-5">
          <table className="w-full">
            <thead>
              <tr><td className="py-4 px-6 font-semibold text-gray-100" colSpan={3}>The country from the list that best matches your values is {formatCountryName(data.country_name)}.</td></tr>
            </thead>
            <tbody>
              <tr>
                <td></td><td>Your Score</td><td>{formatCountryName(data.country_name)}</td>
              </tr>
              <tr>
                <td>Work Ethics</td><td>{formatNumberWithTwoDecimals(data.user_work_score)}</td><td>{formatNumberWithTwoDecimals(data.country_work_score)}</td>
              </tr>
              <tr>
                <td>Importance of religion</td><td>{formatNumberWithTwoDecimals(data.user_religion_score)}</td><td>{formatNumberWithTwoDecimals(data.country_religion_score)}</td>
              </tr>
              <tr>
                <td>Importance of family</td><td>{formatNumberWithTwoDecimals(data.user_fam_score)}</td><td>{formatNumberWithTwoDecimals(data.country_fam_score)}</td>
              </tr>
              <tr>
                <td>Importance of gender equality</td><td>{formatNumberWithTwoDecimals(data.user_gender_equality)}</td><td>{formatNumberWithTwoDecimals(data.country_gender_equality)}</td>
              </tr>
              <tr>
                <td>Ethnic and religious tolerance</td><td>{formatNumberWithTwoDecimals(data.user_ethnic_rel_tolerance)}</td><td>{formatNumberWithTwoDecimals(data.country_ethnic_rel_tolerance)}</td>
              </tr>
              <tr>
                <td>Tolerance towards sexual minorities</td><td>{formatNumberWithTwoDecimals(data.user_sex_minority_tolerance)}</td><td>{formatNumberWithTwoDecimals(data.country_sex_minority_tolerance)}</td>
              </tr>
            </tbody>
          </table>
          </div>
        </>
      )}
    </div>
  )
}

export default page