const daysMatch = (days1, days2) => {
    let match = false;
    ["M", "Tu", "W", "Th", "F"].forEach(day => {
        if (day, days1.search(day) !== -1 && days2.search(day) !== -1) {
            match = true;
        }
    });
    return match;
}

export const parseTime = (time_range) => {
    time_range = time_range.split("-");
    const [start, end] = [time_range[0].split(":"), time_range[1].split(":")];
    const startDate = new Date();
    const endDate = new Date();
    
    startDate.setHours(parseInt(start[0]));
    startDate.setMinutes(parseInt(start[1]));
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    
    endDate.setHours(parseInt(end[0]));
    endDate.setMinutes(parseInt(end[1]));
    endDate.setSeconds(0);
    endDate.setMilliseconds(0);
    
    return [startDate, endDate];
}

const timesOverlap = (time1, time2) => {
    const [start1, end1] = parseTime(time1);
    const [start2, end2] = parseTime(time2);
    return (start1 < end2 && start2 < end1);
}

const doesConflict = (course1, course2) => {
    if (course1[1] === "" || course2[1] === "") return false;
    if (course1[0] === course2[0]) return false;
    course1 = [course1[0], course1[1].split(" ")].flat();
    course2 = [course2[0], course2[1].split(" ")].flat();
    if (course1[0].substring(0, 1) != course2[0].substring(0, 1)) return false;
    if (!daysMatch(course1[1], course2[1])) return false;
    if (!timesOverlap(course1[2], course2[2])) return false;
    return true;
}

export const getDisabled = (selectedCourses, allCourses) => {
    // do any of the selected courses conflict with the rest
    const  restCourses = allCourses.filter((course) => !selectedCourses.includes(course));
    let selected = allCourses.filter(course => selectedCourses.includes(course[0]))
    selected = Object.entries(selected).map(([id, course]) => [course[0], course[1].meets]);
    const rest = Object.entries(restCourses).map(([id, course]) => [course[0], course[1].meets]);
    const disabled = rest.filter(course1 => {
        let output = false;
        selected.forEach(course2 => {
            const out = doesConflict(course1, course2);
            if (out) output = true;
        })
        return output;
    }).map(([id, course]) => id);
    return disabled;
}