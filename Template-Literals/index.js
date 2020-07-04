/**
 * Assignment
 * Cover Letter | Template Literals
 *
 * @author  Arsalan Shaikh - Batch#1 CNC25880 <piaic.org>
 * @author  <mascs11@yahoo.com>
 */

var date = new Date()
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var letterDate =  months[date.getMonth()]+ " " + date.getDate() + ", " + date.getFullYear();
var candidateName = "Daniyal Nogori"
var candidateEmail = "daniyal.nagori@gmail.com"
var candidatePhone  = "0900-78601"
var firmName  = "Panacloud Inc."
var firmPhone = "(971) 847-2122"
var firmAddress = "Shahrah-e-Faisal, Karachi Pakistan"
var coverLetter = `
${letterDate}

[Principal’s Name]
${firmName}
${firmAddress}
${firmPhone}

Dear HR,

I’ve been passionate about web development since I began progamming for pocket money in high school.

I have three years of progamming & development experience, with a diverse range of projects, i worked on. I am also successful at boosting achievement, having emerging JavaScript based technologies like Node, React etc. I believe this makes me an ideal candidate for the role.

I can be contacted at ${candidatePhone} or ${candidateEmail}. I look forward to speaking with you soon.

Sincerely,

${candidateName}
`
// print output in console
console.log( coverLetter );
