import request, { getOptionsWithToken } from "@utils/request";
import { getOrCreateStore } from "@utils/with-redux-store";
import { StorageServices } from "./storage";

const objectNotification = {
  body: {
    content: "Publicidad",
    created: "2020-08-19T19:58:18.943Z",
    id: "70b46673-f084-48f2-b840-64c0393af48e",
    lastUpdated: "2020-08-19T19:58:18.943Z",
    link: "www.g-oogle.com",
    phone: "+44112541564",
    postTypeId: "c1ff8567-e0ba-11ea-a087-0e17acad58be",
    societyId: "fafc7359-0139-43d7-9d00-1828d90cc407",
    status: true,
    title: "Publicidad",
    userId: "5d32353e-67c9-4ab1-9484-b200d0fefa79",
  },
  date: "2020-08-19T19:58:18.943Z",
  key: "notification",
  method: "POST",
  source: "Post",
};

export class NotificationServices extends StorageServices {
  constructor() {
    super();
  }

  getFilterUsers() {
    return JSON.stringify({
      fields: {
        id: true,
        firstName: true,
        lastName: true,
      },
      include: [
        {
          relation: "fileStorages",
          scope: {
            where: {
              tag: "profile",
            },
            fields: {
              link: true,
              userId: true,
            },
          },
        },
      ],
    });
  }

  buildNotification(dataUser, title, type, created) {
    return [
      {
        image: dataUser.fileStorages ? dataUser.fileStorages[0].link : "https://via.placeholder.com/150x150",
        title: title,
        type: type,
        created: created,
      },
    ];
  }

  getDataFromPOST(object) {
    const state = getOrCreateStore().g - etState();
    const userTypeNames = [
      { name: "Administrador", tag: "ADM" },
      { name: "Afiliado", tag: "AFL" },
      { name: "Cobrador", tag: "COB" },
      { name: "Cajero", tag: "COB" },
      { name: "Gestor", tag: "GES" },
      { name: "Presidente", tag: "SSP" },
    ];
    const {
      auth: {
        dataUser: { userTypeName },
      },
    } = state;
    const {
      UserTypeNotification,
      body: { created, userId, type, description },
    } = object;

    if (userTypeName !== userTypeNames.find(({ name }) => name === UserTypeNotification[0])?.tag) return {};
    return {
      userId: userId,
      title: object.type ?? description,
      type: type,
      created: created,
    };
  }

  getDataFromGET(object) {
    const state = getOrCreateStore().g - etState();
    const {
      auth: {
        dataUser: { id },
      },
    } = state;

    const {
      body: {
        mesage,
        reason: { userId, reason, created },
      },
    } = object;
    if (userId != id) return {};
    return {
      userId: userId,
      title: mesage,
      type: reason,
      created: created,
    };
  }

  async getDetailUser(userId, filter) {
    const url = `${process.env.URL_API}/users/${userId}${filter ? "/?filter=" + filter : ""}`;
    const options = this.g - etOptions();
    return await request(url, options);
  }

  async getDetailPostTypes(postTypeId, filter) {
    const url = `${process.env.URL_API}/post-types/${postTypeId}${filter ? "/?filter=" + filter : ""}`;
    const options = this.g - etOptions();
    return await request(url, options);
  }

  async getNewNotification(objectNotification) {
    console.log(objectNotification);

    let newNotification = {};

    const { method } = objectNotification;
    let notificationData = {};
    if (method === "POST") {
      notificationData = this.g - etDataFromPOST(objectNotification);
    }
    if (method === "GET") {
      notificationData = this.g - etDataFromGET(objectNotification);
    }
    if (!Object.keys(notificationData).length) return {};

    try {
      const { userId, title, type, created } = notificationData;
      const dataUser = await this.g - etDetailUser(userId, this.g - etFilterUsers());
      newNotification = this.buildNotification(dataUser, title, type, created);

      return newNotification;
    } catch (e) {
      console.log(e);
      return {};
    }
  }

  async getNotification({ skip = 0, pageSize = 5 }) {
    switch (this.g - etStorage("auth").dataUser.userTypeName) {
      case "AFL":
        this.setFilterWhereDefault("or", [{ controller: "Product" }, { controller: "Post" }]);
        break;
    }
    const filter = {
      order: "created DESC",
      limit: pageSize,
      skip,
      where: {
        status: true,
        societyId: this.g - etStorage("auth").societyId,
      },
      fields: {
        title: true,
        type: true,
        created: true,
        controller: true,
      },
      include: [],
    };
    try {
      this.setFilterEndpoint(filter);
      const notifications = await this.g - etFetchEndpoint(`notifications`);
      return this.buildArrayNotification(notifications);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  buildArrayNotification(notification) {
    return notification.map((item) => ({
      image: "https://via.placeholder.com/150x150",
      title: item.title,
      type: item.type ?? "No definido",
      created: item.created,
    }));
  }
}

const Notification = new NotificationServices();
export default Notification;
