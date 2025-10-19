export const authService = {
   create: async function (req) {
      return `This action create`;
   },

   findAll: async function (req) {
      return `This action returns all auth`;
   },

   findOne: async function (req) {
      return `This action returns a id: ${req.params.id} auth`;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} auth`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} auth`;
   },
};