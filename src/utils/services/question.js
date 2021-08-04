import { StorageServices } from "./storage";

export class QuestionService extends StorageServices {

  constructor() {
    super();
  }

  async getQuestions(id, nested = false) {
    const filter = {
      order: 'createDate DESC',
      include: [
        {
          relation: 'answers',
          scope: {
            where: nested ?? {},
            fields: {
              questionId: true,
              like: true,
              userId: true
            }
          }
        },
        {
          relation: "legalAreaType",
        },
        {
          relation: 'user',
          scope: {
            fields: {
              id: true,
            },
            include: [
              {
                relation: 'fileStorages',
                scope: {
                  fields: {
                    userId: true,
                    linkFile: true,
                  },
                }
              },
            ]
          },
        },
      ],
    }

    try {
      this.setFilterEndpoint(filter);

      const questions = await this.g - etFetchEndpoint(`/questions`);

      for (let j in questions) {
        const likes = 0;
        const comments = 0;

        if (questions[j].answers) {
          for (let i of questions[j].answers) {
            if (i.like) likes++;
            else comments++;

            if (id == i.userId && i.like) questions[j].liked = true;
          }
        }

        let { fileStorages } = questions[j].user ?? {};
        let { typeArea } = questions[j].legalAreaType ?? {};
        if (fileStorages) fileStorages = fileStorages[0].linkFile

        delete questions[j].answers;
        delete questions[j].legalAreaType;

        questions[j].likes = likes;
        questions[j].comments = comments;
        questions[j].avatar = fileStorages ?? null;
        questions[j].typeArea = typeArea ?? null;
      }

      return questions;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async getResponses(questionId) {
    const filter = {
      order: 'createDate DESC',
      fields: {
        like: false,
      },
      where: {
        questionId,
        like: false,
      },
      include: [
        {
          relation: 'user',
          scope: {
            fields: {
              id: true,
              roleId: true,
              firstName: true,
              lastName: true,
              celphone: true,
            },
            include: [
              {
                relation: 'fileStorages',
                scope: {
                  fields: {
                    userId: true,
                    linkFile: true,
                  },
                }
              },
              {
                relation: "role"
              }
            ]
          },
        },
      ]
    }
    try {
      this.resetFilter();
      this.setFilterEndpoint(filter);
      let answers = await this.g - etFetchEndpoint(`/answers`);

      console.log(answers)
      answers = answers.map(({ user, ...others }) => {
        let { id, fileStorages, roleId, role, ...userData } = user ?? {};
        let { roleType } = role ?? {};

        if (fileStorages) fileStorages = fileStorages[0].linkFile

        return ({
          ...others,
          ...userData,
          avatar: fileStorages ?? null,
          roleType
        });
      });

      return answers;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
  async getLegalArea() {
    try {
      this.resetFilter();
      let legalArea = await this.g - etFetchEndpoint(`/legal-area-types`);

      return legalArea;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

const question = new QuestionService();
export default question;
