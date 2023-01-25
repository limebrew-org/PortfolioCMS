class Logger:
    @staticmethod
    def success(msg):
        print("\n ✅  {}".format(msg))

    @staticmethod
    def error(msg):
        print("\n ℹ️  {}".format(msg))

    @staticmethod
    def warning(msg):
        print("\n ⚠️   {}".format(msg))

    @staticmethod
    def error(msg):
        print("\n 🛑  {}".format(msg))

