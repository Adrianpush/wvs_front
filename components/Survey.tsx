"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
import { questions, server_path } from "./constants";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Answer {
  [key: string]: string | undefined;
}

interface ApiResponse {
  uuid: string;
}

interface Question {
  questionID: string;
  questionPrompt: string;
  questionAnswers: Answer[];
}

const Survey = () => {
  const { push } = useRouter();
  const surveyQuestions: Question[] = questions;
  const [answers, setAnswers] = useState({
    Q5: "",
    Q41: "",
    Q58: "",
    Q160: "",
    Q171: "",
    Q28: "",
    Q29: "",
    Q30: "",
    Q31: "",
    Q34: "",
    Q121: "",
    Q170: "",
    Q36: "",
    Q182: "",
    Q19: "2",
    Q21: "2",
    Q23: "2",
    Q22: "2",
  });
  const [loading, setLoading] = useState(false)
  const [isSurveyComplete, setSurveyComplete] = useState(false)


  useEffect(() => {
    setSurveyComplete(!Object.values(answers).some((value) => value === ''))
  }, [answers])

  const handleselectAnswer = (e: ChangeEvent<HTMLInputElement>): void => {
    const target = e.target;
    const qID = target.name;
    const aValue = target.checked ? target.value : "2"; // Set aValue to "2" if the checkbox is unchecked

    const updatedValue = {
      [qID]: aValue,
    };

    setAnswers({
      ...answers,
      ...updatedValue,
    });

  };

  const handleSubmit = async () => {
    
    setLoading(true)
    let path: string = "/survey/results/";

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(answers),
    };

    const response = await fetch(
      server_path + "/api/form",
      requestOptions
    );

    const form_uuid: Promise<ApiResponse> = response.json();
    const id = (await form_uuid).uuid;

    path = path.concat(id);
    push(path);
    
  };

  return (
    <>
      <div className="bg-slate-200 px-14">
        <fieldset>
        <div className="bg-slate-300 py-4 my-4 px-20 rounded-md grid justify-items-center">
            <div className="text-zinc-950 text-center">
              The following list contains various groups of people. Could you
              please select any that you would <strong>not</strong> like to have as neighbors?
            </div>
            <hr className="my-2" />
            <div className="flex bg-slate-500 mt-3 rounded-xl p-1 w-3/4">
              <div className="flex-1">
                <input
                  type="checkbox"
                  value="1"
                  name="Q19"
                  id="Q19"
                  onChange={handleselectAnswer}
                  className="peer hidden"
                ></input>
                <label
                  htmlFor="Q19"
                  className=" flex items-center justify-center h-full bg-slate-500 text-slate-200 shadow  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-slate-200 peer-checked:font-bold peer-checked:text-black"
                >
                  People of a different race
                </label>
              </div>
              <div className="flex-1">
                <input
                  type="checkbox"
                  value="1"
                  name="Q21"
                  id="Q21"
                  onChange={handleselectAnswer}
                  className="peer hidden"
                ></input>
                <label
                  htmlFor="Q21"
                  className=" flex items-center justify-center h-full bg-slate-500 text-slate-200 shadow  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-slate-200 peer-checked:font-bold peer-checked:text-black"
                >
                  Immigrants/foreign workers
                </label>
              </div>
              <div className="flex-1">
                <input
                  type="checkbox"
                  value="1"
                  name="Q23"
                  id="Q23"
                  onChange={handleselectAnswer}
                  className="peer hidden"
                ></input>
                <label
                  htmlFor="Q23"
                  className=" flex items-center justify-center h-full bg-slate-500 text-slate-200 shadow  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-slate-200 peer-checked:font-bold peer-checked:text-black"
                >
                  People of a different religion
                </label>
              </div>
              <div className="flex-1">
                <input
                  type="checkbox"
                  value="1"
                  name="Q22"
                  id="Q22"
                  onChange={handleselectAnswer}
                  className="peer hidden"
                ></input>
                <label
                  htmlFor="Q22"
                  className=" flex items-center justify-center h-full bg-slate-500 text-slate-200 shadow  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-slate-200 peer-checked:font-bold peer-checked:text-black"
                >
                  Homosexuals
                </label>
              </div>
            </div>
          </div>
          {surveyQuestions.map((question: Question) => (
            <div
              key={question.questionID}
              className="bg-slate-300 py-4 my-4 px-20 rounded-md grid justify-items-center"
            >
              <div className="text-zinc-950 text-center">
                {question.questionPrompt}
              </div>
              <hr className="my-2" />
              <div className="flex bg-slate-500 mt-3 rounded-xl p-1 w-3/4">
                {question.questionAnswers.map(
                  (answer: Answer, index: number) => (
                    <div key={index} className="text-zinc-950 flex-1 h-full ">
                      {Object.entries(answer).map(([key, value]) => (
                        <div key={key} className="h-full">
                          <input
                            type="radio"
                            value={value}
                            name={question.questionID}
                            id={question.questionID + "_" + value}
                            onChange={handleselectAnswer}
                            className="peer hidden"
                          ></input>
                          <label
                            htmlFor={question.questionID + "_" + value}
                            className=" flex items-center justify-center h-full bg-slate-500 text-slate-200 shadow  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-slate-200 peer-checked:font-bold peer-checked:text-black"
                          >
                            {key}
                          </label>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
 
          <div className="flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-slate-500 px-4 py-4 rounded-md my-5 hover:bg-slate-700 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            disabled={!isSurveyComplete}
          >
            Submit   
            <Image
            src="/svg/loading.svg"
            style={{
              display: loading?"inline-block":"none"
            }}
            className="mx-3 animate-spin hidden"
            width={30}
            height={30}
            alt="Loading"
          />
          </button>
          </div>

        </fieldset>
      </div>
    </>
  );
};

export default Survey;
