namespace Namespace
{

    using choice = random.choice;

    using System.Collections.Generic;

    using System;

    using System.Linq;

    public static class Module
    {

        public static object @__summary__ = "Generate a random DNA file that is 100MB";

        public static object @__author__ = "@Nv7-GitHub (Nishant Vikramaditya)";

        public static object @__version__ = "2.0.1";

        public static object SIZE = 100000000;

        public static object codes = new List<object> {
            "a",
            "t",
            "g",
            "c"
        };

        public static object txt = "";

        public static object txt = choice(codes);

        static Module()
        {
            f.write(txt);
        }
    }
}