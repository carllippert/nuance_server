import { Router } from "express";

const routes = Router();

import { requestCourse } from "../../speechCourses/requestCourse";

routes.get('/:minutes/:cefr/:secret', async (req, res) => {
    try {
        const { minutes, cefr, secret } = req.params;
        console.log("Course params", req.params)

        if (!secret) throw new Error("No secret provided")
        if (!minutes) throw new Error("No minutes provided")
        if (!cefr) throw new Error("No cefr provided")

        let secretArg = "magic"
        if (secretArg !== secret) throw new Error("Invalid secret")
        let public_course = true;

        let { speech_course_id, speech_course_generation_request_id } = await requestCourse(Number(minutes), cefr, public_course, true);

        console.log("Course request created", speech_course_id, speech_course_generation_request_id);

        res.status(200).send({ speech_course_id, speech_course_generation_request_id });
    } catch (error) {
        res.status(500).send(error);
    }
});

export default routes;