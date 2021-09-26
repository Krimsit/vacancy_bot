const { MessageEmbed } = require("discord.js")
const axios = require("axios")

const get_vacancies = (config) =>
    axios
        .get(`https://api.hh.ru/vacancies?${new URLSearchParams(config)}`)
        .then((res) => {
            const items = res.data.items
            const vacancies = []
            if (items && items.length !== 0) {
                items.forEach((item) => {
                    const vacancy = {
                        id: item.id,
                        preview: `https://thumbnail.hh.ru/vacancy/${item.id}.png`,
                        name: item.name,
                        requirement: item.snippet.requirement ? item.snippet.requirement : "Требования не указаны",
                        responsibility: item.snippet.responsibility ? item.snippet.responsibility : "Задачи не указаны",
                        salary: item.salary
                            ? item.salary.to && !item.salary.from
                                ? `до ${item.salary.to}`
                                : !item.salary.to && item.salary.from
                                ? `от ${item.salary.from}`
                                : `от ${item.salary.from} до ${item.salary.to}`
                            : "Зарплата не указана",
                        area: item.area.name,
                        url: item.alternate_url,
                        employer: {
                            name: item.employer.name,
                            url: item.employer.alternate_url,
                            logo: item.employer.logo_urls.original ? item.employer.logo_urls.original : "https://i.imgur.com/uomkVIL.png",
                        },
                        published_at: item.published_at,
                    }
                    vacancies.push(vacancy)
                })
            }

            return vacancies
        })
        .catch((err) => console.error(err))

const createVacancyEmbed = (vacancy) => {
    const embed = new MessageEmbed()
        .setColor("4CAF50")
        .setTitle(vacancy.name)
        .setURL(vacancy.url)
        .setAuthor(vacancy.employer.name, vacancy.employer.logo, vacancy.employer.url)
        .addFields(
            {
                name: "Работодатель",
                value: `${vacancy.employer.name}, ${vacancy.area}`,
                inline: true,
            },
            { name: "Зарплата", value: vacancy.salary, inline: true },
            { name: "Требования", value: vacancy.requirement },
            { name: "Задачи", value: vacancy.responsibility }
        )
        .setImage(vacancy.preview)
        .setFooter(vacancy.published_at, vacancy.employer.logo, vacancy.employer.url)

    return embed
}

const createErrorEmbed = () => {
    const embed = new MessageEmbed().setColor("F44336").setTitle("Сегодня вакансий не найдено").setImage("https://i.imgur.com/segHJlQ.jpeg")

    return embed
}

module.exports = {
    frontend: async (channel) => {
        const vacancies = await get_vacancies({
            text: "frontend",
            area: 23,
            date_from: new Date(new Date().getTime() - 604800000).toISOString().substring(0, 10) + "T10:00",
            date_to: new Date().toISOString().substring(0, 10) + "T10:00",
        })

        if (vacancies && vacancies.length !== 0) {
            vacancies.forEach((vacancy) => channel.send({ embeds: [createVacancyEmbed(vacancy)] }))
        } else {
            channel.send({ embeds: [createErrorEmbed()] })
        }
    },
    backend: async (channel) => {
        const vacancies = await get_vacancies({
            text: "backend",
            area: 23,
            date_from: new Date(new Date().getTime() - 604800000).toISOString().substring(0, 10) + "T10:00",
            date_to: new Date().toISOString().substring(0, 10) + "T10:00",
        })

        if (vacancies && vacancies.length !== 0) {
            vacancies.forEach((vacancy) => channel.send({ embeds: [createVacancyEmbed(vacancy)] }))
        } else {
            channel.send({ embeds: [createErrorEmbed()] })
        }
    },
    csharp: async (channel) => {
        const vacancies = await get_vacancies({
            text: "c#",
            area: 23,
            date_from: new Date(new Date().getTime() - 604800000).toISOString().substring(0, 10) + "T10:00",
            date_to: new Date().toISOString().substring(0, 10) + "T10:00",
        })

        if (vacancies && vacancies.length !== 0) {
            vacancies.forEach((vacancy) => channel.send({ embeds: [createVacancyEmbed(vacancy)] }))
        } else {
            channel.send({ embeds: [createErrorEmbed()] })
        }
    },
    cplusplus: async (channel) => {
        const vacancies = await get_vacancies({
            text: "c++",
            area: 23,
            date_from: new Date(new Date().getTime() - 604800000).toISOString().substring(0, 10) + "T10:00",
            date_to: new Date().toISOString().substring(0, 10) + "T10:00",
        })

        if (vacancies && vacancies.length !== 0) {
            vacancies.forEach((vacancy) => channel.send({ embeds: [createVacancyEmbed(vacancy)] }))
        } else {
            channel.send({ embeds: [createErrorEmbed()] })
        }
    },
    java: async (channel) => {
        const vacancies = await get_vacancies({
            text: "java",
            area: 23,
            date_from: new Date(new Date().getTime() - 604800000).toISOString().substring(0, 10) + "T10:00",
            date_to: new Date().toISOString().substring(0, 10) + "T10:00",
        })

        if (vacancies && vacancies.length !== 0) {
            vacancies.forEach((vacancy) => channel.send({ embeds: [createVacancyEmbed(vacancy)] }))
        } else {
            channel.send({ embeds: [createErrorEmbed()] })
        }
    },
    design: async (channel) => {
        const vacancies = await get_vacancies({
            text: "дизайнер",
            area: 23,
            date_from: new Date(new Date().getTime() - 604800000).toISOString().substring(0, 10) + "T10:00",
            date_to: new Date().toISOString().substring(0, 10) + "T10:00",
        })

        if (vacancies && vacancies.length !== 0) {
            vacancies.forEach((vacancy) => channel.send({ embeds: [createVacancyEmbed(vacancy)] }))
        } else {
            channel.send({ embeds: [createErrorEmbed()] })
        }
    },
    python: async (channel) => {
        const vacancies = await get_vacancies({
            text: "python",
            area: 23,
            date_from: new Date(new Date().getTime() - 604800000).toISOString().substring(0, 10) + "T10:00",
            date_to: new Date().toISOString().substring(0, 10) + "T10:00",
        })

        if (vacancies && vacancies.length !== 0) {
            vacancies.forEach((vacancy) => channel.send({ embeds: [createVacancyEmbed(vacancy)] }))
        } else {
            channel.send({ embeds: [createErrorEmbed()] })
        }
    },
    devops: async (channel) => {
        const vacancies = await get_vacancies({
            text: "devops",
            area: 23,
            date_from: new Date(new Date().getTime() - 604800000).toISOString().substring(0, 10) + "T10:00",
            date_to: new Date().toISOString().substring(0, 10) + "T10:00",
        })

        if (vacancies && vacancies.length !== 0) {
            vacancies.forEach((vacancy) => channel.send({ embeds: [createVacancyEmbed(vacancy)] }))
        } else {
            channel.send({ embeds: [createErrorEmbed()] })
        }
    },
    tester: async (channel) => {
        const vacancies = await get_vacancies({
            text: "tester",
            area: 23,
            date_from: new Date(new Date().getTime() - 604800000).toISOString().substring(0, 10) + "T10:00",
            date_to: new Date().toISOString().substring(0, 10) + "T10:00",
        })

        if (vacancies && vacancies.length !== 0) {
            vacancies.forEach((vacancy) => channel.send({ embeds: [createVacancyEmbed(vacancy)] }))
        } else {
            channel.send({ embeds: [createErrorEmbed()] })
        }
    },
}
