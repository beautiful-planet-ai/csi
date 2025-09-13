export const secondaryData = {
  enrollment: "55000*",
  institutions: 43,
  parityIndex: 0.57,
  
  enrollmentTarget: 100,
  enrollmentCurrent: 76,

  dropoutRatioTargetValue: 10,
  dropoutRatioCurrentValue: 13,

  teacherStudentRatioTarget: "1:25",
  teacherStudentRatioCurrent: "1:36",
  teacherStudentRatioTargetValue: 1/25,
  teacherStudentRatioCurrentValue:1/36,

  genderLabels: ["Male", "Female"],
  genderData: [35000, 20000],

  institutionsLabels: ["Government", "Private"],
  institutionsData: [25, 18],

  years: ["2018", "2019", "2020", "2021"],
  enrollmentTrendData: [
    { name: "Male", data: [120, 126, 135, 150] },
    { name: "Female", data: [68, 75, 75, 90] },
  ],
  dropoutTrendData: [
    { name: "Male", data: [5, 4, 6, 8] },
    { name: "Female", data: [8, 6, 3, 5] },
  ],
  teacherStudentRatioTrend: [40, 45, 60, 36],

  institutionsAnalysisLabels: ["Junior High School", "Inter College"],
  institutionsAnalysisData: [
    { name: "Target", data: [159, 119] },
    { name: "Existing", data: [24, 19] },
  ],

};
